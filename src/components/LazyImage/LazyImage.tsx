'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from 'react'

import clsx from 'clsx'

import styles from './LazyImage.module.scss'

type Props = {
  placeholderSrc: string
  src: string
  srcSet?: string
  alt: string
  className?: string
  imgClassName?: string
}

export default function LazyImage({
  placeholderSrc,
  src,
  srcSet,
  alt,
  className,
  imgClassName,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [onscreen, setOnscreen] = useState(true)
  const coverReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOnscreen(false)
    setLoading(true)
    if (!coverReference.current) return
    const observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        setOnscreen(true)
        observer.disconnect()
      }
    })
    observer.observe(coverReference.current)
    return () => {
      observer.disconnect()
    }
  }, [src, srcSet])

  return (
    <div className={clsx(styles.imgCover, className)} ref={coverReference}>
      {onscreen && (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          className={clsx(
            { [styles.loading]: loading },
            styles.showImg,
            imgClassName,
          )}
          onLoad={() => setLoading(false)}
        />
      )}
      <img
        src={placeholderSrc}
        alt={alt}
        className={clsx(
          { [styles.loading]: loading },
          styles.placeholderImg,
          imgClassName,
        )}
      />
    </div>
  )
}
