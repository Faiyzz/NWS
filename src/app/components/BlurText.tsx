'use client'
import type { JSX } from 'react'

import { motion, Transition } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  ReactNode,
  isValidElement,
  cloneElement,
  ReactElement,
  JSXElementConstructor,
} from 'react'

type AnimationSnapshot = Record<string, string | number>

type BlurTextProps = {
  text?: string
  children?: ReactNode
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: AnimationSnapshot
  animationTo?: AnimationSnapshot[]
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
}

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ])
  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((s) => s[key])]
  })
  return keyframes
}

const flattenContent = (
  children: ReactNode
): Array<string | ReactElement> => {
  const output: Array<string | ReactElement> = []

  const walk = (node: ReactNode): void => {
    if (typeof node === 'string') {
      output.push(...node.split(' '))
    } else if (Array.isArray(node)) {
      node.forEach(walk)
    } else if (isValidElement(node)) {
      if (node.type === 'br') {
        output.push(<br key={`br-${output.length}`} />)
      } else {
        const element = node as ReactElement<
          { children?: ReactNode },
          keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>
        >

        const childText = element.props.children

        if (typeof childText === 'string') {
          childText.split(' ').forEach((word, i) => {
            output.push(
              cloneElement(
                element,
                { key: `${output.length}-${i}` },
                word
              )
            )
          })
        } else {
          output.push(element)
        }
      }
    }
  }



  walk(children)
  return output
}

export default function BlurText({
  text = '',
  children,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps): JSX.Element {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
      },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  )

  const contentArray =
    children != null
      ? flattenContent(children)
      : animateBy === 'words'
      ? text.split(' ')
      : text.split('')

  return (
    <p
      ref={ref}
      className={`${className} flex flex-wrap will-change-transform leading-snug`}
    >
      {contentArray.map((item, index) => {
        if (isValidElement(item) && item.type === 'br') {
          return <br key={`br-${index}`} />
        }

        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition: Transition & {
          ease: (t: number) => number
        } = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        }

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === contentArray.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
              marginRight: '0.4ch',
            }}
          >
            {item}
          </motion.span>
        )
      })}
    </p>
  )
}
