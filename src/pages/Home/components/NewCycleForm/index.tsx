import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { CyclesContext } from '../..'

export const newCycleFormValidatySchema = zod.object({
  task: zod.string().min(1, 'Esse campo deve conter algum caracter'),
  minutesAmount: zod
    .number()
    .min(1, 'Esse campo deve conter no minimo 5 e no maxímo 60')
    .max(60, 'Esse campo deve conter no minimo 5 e no maxímo 60 '),
})

type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidatySchema>

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)

  const { register } = useForm<NewCycleFormDataProps>({
    resolver: zodResolver(newCycleFormValidatySchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minuto.</span>
    </FormContainer>
  )
}
