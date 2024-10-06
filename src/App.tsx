import { useId, useState } from "react";
import "./App.css";

type InputProps = {
  label: string;
  // Qiitaネタ => undefinedとnullの違い
  placeholder: string | undefined;
  inputType: string;
  // Qiitaネタ => 子コンポーネントでのイベントeを親コンポーネントで使う方法
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const InputTaskArea: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [person, setPerson] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState<Array<task>>([
    {
      id: 1,
      name: "掃除",
      person: "omi",
      deadline: "2024-10-06",
    },
  ]);

  const handleRegisterBtnClick = () => {
    const newTask = {
      id: tasks.length + 1,
      name: name,
      person: person,
      deadline: deadline,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
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
      />
      <Input
        label="担当者"
        placeholder="担当者を入力"
        inputType="text"
        onInputChange={handlePersonChange}
      />
      <Input
        label="期限"
        placeholder=""
        inputType="date"
        onInputChange={handleDeadlineChange}
      />
      <RegisterBtn onRegisterBtnClick={handleRegisterBtnClick} />
    </div>
  );
};

function App() {
  return (
    <div className="container">
      <InputTaskArea />
    </div>
  );
}

export default App;
