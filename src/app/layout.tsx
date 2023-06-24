import './globals.scss'

import React from 'react'

import { mdiHeart, mdiMovieOpen, mdiPopcorn, mdiStar, mdiTicket } from '@mdi/js'
import { Inter } from 'next/font/google'

import styles from '@/app/layout.module.scss'
import BackToTopButton from '@/components/BackToTopButton/BackToTopButton'
import CategoryNavigation, {
  Category,
} from '@/components/CategoryNavigation/CategoryNavigation'
import SearchBox from '@/components/SearchBox/SearchBox'
import StoreProvider from '@/store/provider'

const inter = Inter({ weight: 'variable', subsets: ['latin'] })

const categories: Category[] = [
  {
    name: 'Now Playing',
    icon: mdiPopcorn,
    color: '#00695C',
    href: '/now-playing',
  },
  {
    name: 'Popular',
    icon: mdiTicket,
    color: '#2E7D32',
    href: '/popular',
  },
  {
    name: 'Top Rated',
    icon: mdiStar,
    color: '#F57F17',
    href: '/top-rated',
  },
  {
    name: 'Upcoming',
    icon: mdiMovieOpen,
    color: '#0D47A1',
    href: '/upcoming',
  },
  {
    name: 'Favorite Movies',
    icon: mdiHeart,
    color: '#C62828',
    href: '/favorite',
  },
]

export const metadata = {
  title: 'Movie Nights',
  description: 'Movie Nights for assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <BackToTopButton />
          <div className={styles.pageBody}>
            <div className={styles.searchBoxCover}>
              <SearchBox />
            </div>
            <div className={styles.categorySelectCover}>
              <CategoryNavigation categories={categories} />
            </div>
            <div className={styles.childrenCover}>{children}</div>
          </div>
        </body>
      </html>
    </StoreProvider>
  )
}
