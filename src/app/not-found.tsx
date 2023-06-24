import { mdiAlertCircle } from '@mdi/js'

import IconTextJumbotron from '@/components/IconTextJumbotron/IconTextJumbotron'

export default function NotFound() {
  return (
    <div>
      <IconTextJumbotron icon={mdiAlertCircle} text={`Page not found`} />
    </div>
  )
}
