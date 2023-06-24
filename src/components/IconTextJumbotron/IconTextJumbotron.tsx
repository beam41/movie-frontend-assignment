import Icon from '@mdi/react'

import styles from './IconTextJumbotron.module.scss'

type Props = {
  icon: string
  text: string
}

export default function IconTextJumbotron({ icon, text }: Props) {
  return (
    <div className={styles.iconTextJumbotron}>
      <Icon path={icon} size={10} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}
