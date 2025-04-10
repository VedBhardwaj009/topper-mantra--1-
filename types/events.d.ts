import { ChangeEvent, FormEvent, MouseEvent } from 'react'

export type FormSubmitEvent = FormEvent<HTMLFormElement>
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>
export type ButtonClickEvent = MouseEvent<HTMLButtonElement>
