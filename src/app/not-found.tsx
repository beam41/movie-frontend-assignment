'use client'
import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'
import { useClearSearchOnEnter } from '@/hooks/useClearSearchOnEnter'
import { useScrollTopOnEnter } from '@/hooks/useScrollTopOnEnter'

export default function NotFound() {
  useScrollTopOnEnter()
  useClearSearchOnEnter()

  return (
    <div>
      <IconTextJumbotron icon={mdiAlertCircle} text={`Page not found`} />
    </div>
  )
}
