'use client'
import React, { useEffect, useState, useRef } from 'react'

import clsx from 'clsx'

import styles from './LazyImage.module.scss'

type Props = {
  placeholderSrc: string
  src: string
  srcSet?: string
  alt: string
  className?: string
}

export default function LazyImage({
  placeholderSrc,
  src,
  srcSet,
  alt,
  className,
}: Props) {
  const [currentSource, setCurrentSource] = useState(placeholderSrc)
  const [currentSourceSet, setCurrentSourceSet] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const coverReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentSource(placeholderSrc)
    setCurrentSourceSet(undefined)
    setLoading(true)
    if (!coverReference.current) return
    const observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const image = new Image()
        image.src = src
        if (srcSet) {
          image.srcset = srcSet
        }
        image.addEventListener('load', () => {
          setCurrentSource(src)
          setCurrentSourceSet(srcSet)
          setLoading(false)
        })
        observer.disconnect()
      }
    })
    observer.observe(coverReference.current)
    return () => {
      observer.disconnect()
    }
  }, [src, srcSet])

  return (
    <div className={styles.imgCover} ref={coverReference}>
      <img
        src={currentSource}
        srcSet={currentSourceSet}
        alt={alt}
        className={clsx({ [styles.loading]: loading }, className)}
      />
    </div>
  )
}
