'use client'
import { mdiHeart, mdiMovieOpen, mdiPopcorn, mdiStar, mdiTicket } from '@mdi/js'

import CategorySelect, {
  Category,
} from '@/components/CategorySelect/CategorySelect'
import MovieGrid from '@/components/MovieGrid/MovieGrid'
import SearchBox from '@/components/SearchBox/SearchBox'

import styles from './page.module.scss'

const movies = [
  {
    adult: false,
    backdrop_path: '/e2Jd0.1sYMCe6qvMbswGQbM0Mzxt0.jpg',
    genre_ids: [28, 80, 53],
    id: 385_687,
    original_language: 'en',
    original_title: 'Fast X',
    overview:
      "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    popularity: 6682.1,
    poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    release_date: '2023-05-17',
    title: 'Fast X',
    video: false,
    vote_average: 7.319,
    vote_count: 1870,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [28, 35],
    id: 391_559,
    original_language: 'en',
    original_title: 'Fast',
    overview:
      'A balls to the wall action film about Fast, the fastest person alive, who is also named Fast.',
    popularity: 1.289,
    poster_path: '/p8c0a159yKnpciQCFsR8BaC23po.jpg',
    release_date: '2010-06-24',
    title: 'Fast',
    video: false,
    vote_average: 2,
    vote_count: 1,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [53, 18],
    id: 556_682,
    original_language: 'en',
    original_title: 'Fast',
    overview:
      'A former special forces badass is recruited by the DEA to lead a covert black ops team to take down drug dealers that are protected by the CIA.',
    popularity: 1.713,
    poster_path: null,
    release_date: '',
    title: 'Fast',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/hpgda6P9GutvdkDX5MUJ92QG9aj.jpg',
    genre_ids: [28, 12, 35],
    id: 384_018,
    original_language: 'en',
    original_title: 'Fast & Furious Presents: Hobbs & Shaw',
    overview:
      "Ever since US Diplomatic Security Service Agent Hobbs and lawless outcast Shaw first faced off, they just have traded smack talk and body blows. But when cyber-genetically enhanced anarchist Brixton's ruthless actions threaten the future of humanity, they join forces to defeat him.",
    popularity: 123.423,
    poster_path: '/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg',
    release_date: '2019-08-01',
    title: 'Fast & Furious Presents: Hobbs & Shaw',
    video: false,
    vote_average: 6.865,
    vote_count: 6448,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [10_749, 35],
    id: 325_334,
    original_language: 'fr',
    original_title: 'Fast',
    overview:
      'Jean-Louis is an naive, amiable orphan who spent his life with his elderly and very strict grandfather. Jean-Louis was a 25-year old virgin when a free-spirited young Parisian woman was temporarily stranded in his village after a bus broke down. She left him a changed man, and she also left a match book from a fast food restaurant called Fast Burger. Soon after his grandfather passes away, the innocent rube Jean-Louis hops on his bike and embarks upon a quest to Paris to find this enigmatic woman. But he is not prepared for the size of Paris, and instead ends up working at a Fast Burger outlet himself. Jean-Louis is a simple soul and freely expresses himself without guile. For some reason this endears him to the staff and management; soon he has been promoted into the upper echelons of the company. One day he meets a rather ditzy Metro security guard, Henriette, who is also at sea in the big city. The kindred spirits click and a sweet romance ensues.',
    popularity: 0.894,
    poster_path: '/Ai1vJjK5Mv8SEJXbV27h5nP3Azl.jpg',
    release_date: '1995-06-07',
    title: 'Fast',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    id: 1_130_892,
    original_language: 'en',
    original_title: 'Fast',
    overview:
      'A woman signs the verb “fast” in American Sign Language by putting her thumb and index finger together and “zipping” her mouth, which resembles the action of closing one’s mouth to be silent. The speed of the action is slowed down, so the person signs the word "fast" very slowly.',
    popularity: 0.6,
    poster_path: '/3F9HuLEo6t6SG34griZ3oRiVLAC.jpg',
    release_date: '2007-01-01',
    title: 'Fast',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [28, 80, 53],
    id: 755_679,
    original_language: 'en',
    original_title: 'Fast X: Part 2',
    overview: 'The eleventh installment in The Fast Saga.',
    popularity: 78.649,
    poster_path: '/lD8V3DBban95Mxz4sjuA81Tw771.jpg',
    release_date: '2025-04-04',
    title: 'Fast X: Part 2',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/AqtTwTPOjRnmSudK1rywiUoE9xH.jpg',
    genre_ids: [35, 10_749, 28],
    id: 889_741,
    original_language: 'th',
    original_title: 'เร็วโหด..เหมือนโกรธเธอ',
    overview:
      'When a world champion of sport stacking is dumped by his long-time girlfriend, he has to learn basic adulting skills in order to live alone and take care of himself.',
    popularity: 16.017,
    poster_path: '/46Ab9aS5x9ZVhsbcQ3d5QjzfuBb.jpg',
    release_date: '2022-04-06',
    title: 'Fast & Feel Love',
    video: false,
    vote_average: 7.167,
    vote_count: 21,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    id: 1_126_217,
    original_language: 'en',
    original_title: 'Fast X: Part 3',
    overview:
      'The twelfth and potentially final installment in the Fast and Furious franchise. Implied to be the third in the Fast X Trilogy.',
    popularity: 17.573,
    poster_path: '/jRTw7kYix1ubUGa913Dqq9CBDYR.jpg',
    release_date: '',
    title: 'Fast X: Part 3',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/nR7e6of0ZVxB8v04gGbjOJ9rb8w.jpg',
    genre_ids: [12, 16, 35, 10_751, 14],
    id: 424_656,
    original_language: 'ja',
    original_title: 'クレヨンしんちゃん 爆睡！ユメミーワールド大突撃',
    overview:
      "One night, the Nohara family were enjoying a pleasant dream, when suddenly a big fish appeared in their dreams and ate them. The next morning, Hiroshi read in the newspaper that everybody in another town had the same nightmare as him, but it seemed to have ended. But Hiroshi also heard the same dream from Misae, Shinnosuke, Himawari and even Shiro. They were surprised and thought if the same thing is happening in Kasukabe too. In kindergarten, on telling others about his nightmare, Shinnosuke was surprised to know that everybody too had the same dream. Then a mysterious girl named Saki was transferred to Futaba Kindergarten and joined Shinnosuke's class. Everyone in the class, including the rather inactive Bo-chan, were all excited and happy on seeing her. But Saki had a cold attitude and didn't get along well.",
    popularity: 11.517,
    poster_path: '/obwoDfQFUoZ80xrQXbXLZUBIh6z.jpg',
    release_date: '2016-04-16',
    title: 'Crayon Shin-chan: Fast Asleep! Dreaming World Big Assault!',
    video: false,
    vote_average: 7.632,
    vote_count: 34,
  },
  {
    adult: false,
    backdrop_path: '/bXILbW1i0WRShd6s4LfLKdJM6zm.jpg',
    genre_ids: [10_751, 16, 35, 28, 12],
    id: 42_246,
    original_language: 'en',
    original_title: 'Tom and Jerry: The Fast and the Furry',
    overview:
      'After being evicted from their old house by Tom\'s owner for causing major damage, cat and mouse Tom and Jerry enter a race entitled the "Fabulous Super Race" to win a mansion.',
    popularity: 38.481,
    poster_path: '/7PeNpz4mDyRqDxMhC0g0FCpVwPB.jpg',
    release_date: '2005-10-11',
    title: 'Tom and Jerry: The Fast and the Furry',
    video: false,
    vote_average: 6.928,
    vote_count: 230,
  },
  {
    adult: false,
    backdrop_path: '/YBSeCMORtdET4PV1gIJdfPAcHi.jpg',
    genre_ids: [18, 35],
    id: 258_322,
    original_language: 'it',
    original_title: 'Allacciate le cinture',
    overview:
      "Elena and Antonio seem not to be made for each other. They are too different in terms of character, life choices, worldview, and the way they relate to others. They are total opposites. However, they are overwhelmed by a mutual attraction they're trying hard to avoid; but to which they succumb to.",
    popularity: 10.625,
    poster_path: '/8yDZUKQQLZQEPw1wRXS2ZNEsHqG.jpg',
    release_date: '2014-03-06',
    title: 'Fasten Your Seatbelts',
    video: false,
    vote_average: 6.8,
    vote_count: 240,
  },
  {
    adult: false,
    backdrop_path: '/57JIik4WQJ4SFUgRm7q6X6USlSF.jpg',
    genre_ids: [28],
    id: 213_927,
    original_language: 'en',
    original_title: 'Born to Race: Fast Track',
    overview:
      'Danny Krueger is a twenty-year old drag racer who plays by his own rules. After winning a scholarship to the prestigious Fast Lane Racing Academy, Danny finds himself competing against some of the fiercest young drivers in the world. Tension soars on and off the track, and a terrible incident leaves Danny without a racing partner. Facing dismissal from the academy, Danny is forced to team up with an old rival. The pair must learn to set aside their differences as they vie for rookie spots on a professional racing team.',
    popularity: 22.129,
    poster_path: '/sYYQ9kS6Twvt0UcjxGLmBcq5k11.jpg',
    release_date: '2014-03-20',
    title: 'Born to Race: Fast Track',
    video: false,
    vote_average: 6.5,
    vote_count: 87,
  },
  {
    adult: false,
    backdrop_path: '/mEMjegjbF08sV7GGvn8nIThp21z.jpg',
    genre_ids: [12, 16],
    id: 51_887,
    original_language: 'en',
    original_title: 'Fast Film',
    overview:
      "Bits of found film and different types of animation illustrate a classic chase scene scenario: A woman is abducted and a man comes to her rescue, but during their escape they find themselves in the enemy's secret headquarters.",
    popularity: 2.265,
    poster_path: '/l72k120RMWPrBvwQYeEV13EqLUi.jpg',
    release_date: '2003-05-01',
    title: 'Fast Film',
    video: false,
    vote_average: 6.79,
    vote_count: 31,
  },
  {
    adult: false,
    backdrop_path: '/gRHRNtiqvn5bBUUIVu09zd8lorW.jpg',
    genre_ids: [80, 18, 28, 53],
    id: 41_283,
    original_language: 'en',
    original_title: 'Faster',
    overview:
      'After 10 years in prison, Driver is now a free man with a single focus - hunting down the people responsible for brutally murdering his brother.',
    popularity: 22.181,
    poster_path: '/AsUeaXrhw4oscCSjUZ6heh1pVvd.jpg',
    release_date: '2010-11-23',
    title: 'Faster',
    video: false,
    vote_average: 6.316,
    vote_count: 1706,
  },
  {
    adult: false,
    backdrop_path: '/q3XAe77oga8zCH8G6d8T4izEPZ6.jpg',
    genre_ids: [14, 18],
    id: 13_245,
    original_language: 'iu',
    original_title: 'ᐊᑕᓈᕐᔪᐊᑦ',
    overview:
      'Based on a local legend and set in an unknown era, it deals with universal themes of love, possessiveness, family, jealousy and power. Beautifully shot, and acted by Inuit people, it portrays a time when people fought duels by taking turns to punch each other until one was unconscious, made love on the way to the caribou hunt, ate walrus meat and lit their igloos with seal-oil lamps.',
    popularity: 4.427,
    poster_path: '/jUHznhUDIPmFlL652zyzvdRksVg.jpg',
    release_date: '2002-02-01',
    title: 'Atanarjuat: The Fast Runner',
    video: false,
    vote_average: 6.95,
    vote_count: 60,
  },
  {
    adult: false,
    backdrop_path: '/oooZkKlOCmswD7JKEBG3FbG8pPn.jpg',
    genre_ids: [18, 28, 53],
    id: 375_946,
    original_language: 'fr',
    original_title: 'Le Convoi',
    overview:
      'Málaga, southern Spain. Seven men, divided into four cars, set off with a large drug shipment towards Creil, a city near Paris; a routine mission that will be complicated by a fatal sequence of events.',
    popularity: 9.311,
    poster_path: '/ueJOZdL66KD8An9HntIdxKHxx.jpg',
    release_date: '2016-01-20',
    title: 'Fast Convoy',
    video: false,
    vote_average: 5.543,
    vote_count: 93,
  },
  {
    adult: false,
    backdrop_path: '/dMARcKLrv0T7kVJ4iQR3vqTTdtT.jpg',
    genre_ids: [28, 80, 18, 53],
    id: 9615,
    original_language: 'en',
    original_title: 'The Fast and the Furious: Tokyo Drift',
    overview:
      'In order to avoid a jail sentence, Sean Boswell heads to Tokyo to live with his military father. In a low-rent section of the city, Shaun gets caught up in the underground world of drift racing',
    popularity: 16.088,
    poster_path: '/46xqGOwHbh2TH2avWSw3SMXph4E.jpg',
    release_date: '2006-06-03',
    title: 'The Fast and the Furious: Tokyo Drift',
    video: false,
    vote_average: 6.447,
    vote_count: 6041,
  },
  {
    adult: false,
    backdrop_path: '/k63u1PAW8aL7hy1Rwtn0d0oy4rn.jpg',
    genre_ids: [18, 12, 36],
    id: 9912,
    original_language: 'en',
    original_title: "The World's Fastest Indian",
    overview:
      "The life story of New Zealander Burt Munro, who spent years building a 1920 Indian motorcycle—a bike which helped him set the land-speed world record at Utah's Bonneville Salt Flats in 1967.",
    popularity: 19.445,
    poster_path: '/i7obsEYXjo725H9vneFqxxUiZw7.jpg',
    release_date: '2005-10-12',
    title: "The World's Fastest Indian",
    video: false,
    vote_average: 7.598,
    vote_count: 610,
  },
  {
    adult: false,
    backdrop_path: '/uTz92k0CfZpn1p3xRmPbgt7MQTz.jpg',
    genre_ids: [35],
    id: 13_342,
    original_language: 'en',
    original_title: 'Fast Times at Ridgemont High',
    overview:
      'Based on the real-life adventures chronicled by Cameron Crowe, Fast Times follows a group of high school students growing up in Southern California. Stacy Hamilton and Mark Ratner are looking for a love interest, and are helped along by their older classmates, Linda Barrett and Mike Damone, respectively. At the center of the film is Jeff Spicoli, a perpetually stoned surfer who faces-off with the resolute Mr. Hand—a man convinced that everyone is on dope.',
    popularity: 17.836,
    poster_path: '/e15rmfjf0m6EGLe4MnNhwD3Dd1W.jpg',
    release_date: '1982-08-13',
    title: 'Fast Times at Ridgemont High',
    video: false,
    vote_average: 6.807,
    vote_count: 1070,
  },
]

const categories: Category[] = [
  {
    name: 'Now playing',
    icon: mdiPopcorn,
    color: '#00695C',
    visible: true,
  },
  {
    name: 'Popular',
    icon: mdiTicket,
    color: '#2E7D32',
    visible: true,
  },
  {
    name: 'Top rated',
    icon: mdiStar,
    color: '#F57F17',
    visible: true,
  },
  {
    name: 'Upcoming',
    icon: mdiMovieOpen,
    color: '#0D47A1',
    visible: true,
  },
  {
    name: 'Favorite movies',
    icon: mdiHeart,
    color: '#C62828',
    visible: true,
  },
]
export default function Home() {
  return (
    <div className={styles.pageBody}>
      <div className={styles.searchBoxCover}>
        <SearchBox
          value={'fsdf'}
          onInput={(value) => {
            console.log(value)
          }}
        />
      </div>
      <div className={styles.categorySelectCover}>
        <CategorySelect
          categories={categories}
          selectingCategoryIndex={0}
          onClick={(index) => {
            console.log(index)
          }}
        />
      </div>
      <div className={styles.gridCover}>
        <MovieGrid movies={movies} renderSkeleton={false} skeletonAmount={12} />
      </div>
    </div>
  )
}
