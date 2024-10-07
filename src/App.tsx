import { useEffect, useId, useState } from "react";
import "./App.scss";

type InputTaskAreaProps = {
  tasks: Array<task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<task>>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
};

type InputProps = {
  label: string;
  // Qiitaネタ => undefinedとnullの違い
  placeholder: string | undefined;
  inputType: string;
  // Qiitaネタ => 子コンポーネントでのイベントeを親コンポーネントで使う方法
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

type RegisterBtnProps = {
  // Qiitaネタ => void と () => void
  onRegisterBtnClick: () => void;
};

type task = {
  id: number;
  name: string;
  person: string;
  deadline: string;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  inputType,
  onInputChange,
  value,
}) => {
  // Qiitaネタ => idを使いたいときの設定
  const id = useId();
  return (
    <div className="input">
      <label htmlFor={id} className="input_label">
        {label}
      </label>
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
      />
    </div>
  );
};

const RegisterBtn: React.FC<RegisterBtnProps> = ({ onRegisterBtnClick }) => {
  return (
    <div className="registerBtn">
      <button onClick={onRegisterBtnClick}>登録</button>
    </div>
  );
};

const InputTaskArea: React.FC<InputTaskAreaProps> = ({
  tasks,
  setTasks,
  name,
  setName,
  person,
  setPerson,
  deadline,
  setDeadline,
}) => {
  const handleRegisterBtnClick = () => {
    const newTask = {
      id: tasks.length + 1,
      name: name,
      person: person,
      deadline: deadline,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    // Qiitaネタ => console.logの限界、自動で作成されることの弊害
    setName("");
    setPerson("");
    setDeadline("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  return (
    <div className="inputTaskArea">
      <Input
        label="タスク名"
        placeholder="タスク名を入力"
        inputType="text"
        onInputChange={handleNameChange}
        value={name}
      />
      <Input
        label="担当者"
        placeholder="担当者を入力"
        inputType="text"
        onInputChange={handlePersonChange}
        value={person}
      />
      <Input
        label="期限"
        placeholder=""
        inputType="date"
        onInputChange={handleDeadlineChange}
        value={deadline}
      />
      <RegisterBtn onRegisterBtnClick={handleRegisterBtnClick} />
    </div>
  );
};

type TasksAreaProps = {
  tasks: Array<task>;
  onDeleteBtnClick: (i: number) => void;
};

const TasksArea: React.FC<TasksAreaProps> = ({ tasks, onDeleteBtnClick }) => {
  return (
    <table className="tasksTable">
      <thead className="tasksTable_thead">
        <tr>
          <th className="tasksTable_th">ID</th>
          <th className="tasksTable_th">タスク名</th>
          <th className="tasksTable_th">担当者</th>
          <th className="tasksTable_th">期限</th>
          <th className="tasksTable_th">操作</th>
        </tr>
      </thead>
      <tbody className="tasksTable_tbody">
        {tasks.map((task: task) => {
          return (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.person}</td>
              <td>{task.deadline}</td>
              <td>
                {/* Qiitaネタ => 子コンポーネントの情報を親コンポーネントで使う方法 */}
                <button onClick={() => onDeleteBtnClick(task.id)}>削除</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type FilteringAreaProps = {
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilteringArea: React.FC<FilteringAreaProps> = ({ onFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="絞り込みキーワードを入力"
      onChange={onFilterChange}
    />
  );
};

function App() {
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState<Array<task>>([
    {
      id: 1,
      name: "掃除",
      person: "omi",
      deadline: "2024-10-06",
    },
  ]);

  const handleDeleteBtnClick = (task_id: number) => {
    const deletedTasks = tasks.filter((task) => task.id !== task_id);
    setTasks(deletedTasks);
  };

  const [filteringWord, setFilteringWord] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Array<task>>(tasks);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilteringWord = e.target.value;
    setFilteringWord(newFilteringWord);
  };

  // Qiitaネタ useEffect
  useEffect(() => {
    const newFilterdTasks = tasks.filter(
      (task) =>
        task.name.includes(filteringWord) || task.person.includes(filteringWord)
    );
    setFilteredTasks(newFilterdTasks);
  }, [filteringWord, tasks]);

  return (
    <div className="container">
      <InputTaskArea
        tasks={tasks}
        setTasks={setTasks}
        name={name}
        setName={setName}
        person={person}
        setPerson={setPerson}
        deadline={deadline}
        setDeadline={setDeadline}
      />
      <FilteringArea onFilterChange={handleFilterChange} />
      <TasksArea
        tasks={filteredTasks}
        onDeleteBtnClick={handleDeleteBtnClick}
      />
    </div>
  );
}

export default App;
