'use client'
import { createRef, useMemo } from 'react'

import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { removeSnackbar } from '@/store/snackbar/snackbarReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'

import styles from './Snackbar.module.scss'

export default function Snackbar() {
  const dispatch = useAppDispatch()
  const snackbars = useAppSelector((state) => state.snackbar.snackbars)

  const snackbarsWithNodeReference = useMemo(
    () =>
      snackbars.map((snackbar) => ({
        ...snackbar,
        nodeRef: createRef<HTMLDivElement>(),
      })),
    [snackbars],
  )

  return (
    <TransitionGroup className={styles.snackbarGroup} component="div">
      {snackbarsWithNodeReference.map((snackbar) => (
        <CSSTransition
          key={snackbar.id}
          timeout={{
            enter: 100,
            exit: 250,
          }}
          classNames={{
            enter: styles.snackbarFadeEnter,
            enterActive: styles.snackbarFadeEnterActive,
            exit: styles.snackbarFadeExit,
            exitActive: styles.snackbarFadeExitActive,
          }}
          nodeRef={snackbar.nodeRef}
        >
          <div
            ref={snackbar.nodeRef}
            className={clsx(styles.snackbar, {
              [styles.success]: snackbar.color === 'success',
              [styles.error]: snackbar.color === 'error',
            })}
          >
            {snackbar.message}
            <button
              className={styles.removeButton}
              onClick={() => dispatch(removeSnackbar(snackbar.id))}
            >
              <Icon path={mdiClose} size={0.9} />
            </button>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
