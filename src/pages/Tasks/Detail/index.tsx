import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import moment from "moment";
import api from "../../../services/api";
import { Button, Card, Badge } from 'react-bootstrap'

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  create_at: Date;
  update_at: Date;
}

const Detail: React.FC = () => {

  const history = useHistory()
  const { id } = useParams()

  const [task, setTask] = useState<ITask>()

  useEffect(() => {
    findTask()
    // eslint-disable-next-line
  }, [id])

  function back() {
    history.goBack()
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`)
    console.log(response)
    setTask(response.data)
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY, h:mm:ss a");
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="task-header">
          <h1>Detalhe da Tarefa</h1>
          <Button variant="dark" onClick={back}>Voltar</Button>
        </div>
        <br />

        <Card >
          <Card.Body>
            <Card.Title>{task?.title}</Card.Title>
            <Card.Text>
              {task?.description}
              <br />
              <Badge variant={task?.finished ? "success" : "warning"}>
                {task?.finished ? "Finalizado" : "Pendente"}
              </Badge>
              <br />
              <br/>
              <strong>Data de Cadastro:</strong>{' '}
              <Badge variant="info">
                {formatDate(task?.create_at)}
              </Badge>
              <br />
              <strong>Data de Atualização:</strong>{' '}
              <Badge variant="info">
                {formatDate(task?.update_at)}
              </Badge>
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
    </>
  )
}
export default Detail