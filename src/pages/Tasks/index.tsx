import React, { useState, useEffect } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import moment from "moment";
import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  create_at: Date;
  update_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data);
  }

  async function fineshedTask(id: number) {
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push("/tarefas_cadastro");
  }

  function editTasks(id: number) {
    history.push(`/tarefas_cadastro/${id}`);
  }

  function viewTask(id: number) {
    history.push(`/tarefas/${id}`);
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="task-header">
          <h1>Tasks Page</h1>
          <Button variant="dark" onClick={newTask}>
            Nova Tarefa
          </Button>
        </div>
        <br />
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Data de Atualização</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{formatDate(task.update_at)}</td>
                <td>
                  <Badge variant={task.finished ? "success" : "warning"}>
                    {task.finished ? "Finalizado" : "Pendente"}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    disabled={task.finished}
                    onClick={() => editTasks(task.id)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="success"
                    disabled={task.finished}
                    onClick={() => fineshedTask(task.id)}
                  >
                    Finalizar
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => viewTask(task.id)}
                  >
                    Visualizar
                  </Button>{" "}
                  <Button
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    variant="danger"
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Tasks;
