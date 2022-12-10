import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1> Meu Historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tarefa</td>
              <td>20 minutes</td>
              <td>cerca de 2hrs</td>
              <td>
                <Status statusColor="red">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutes</td>
              <td>cerca de 2hrs</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutes</td>
              <td>cerca de 2hrs</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutes</td>
              <td>cerca de 2hrs</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 minutes</td>
              <td>cerca de 2hrs</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
