import { useId } from "react";
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
  const handleRegisterBtnClick = () => {
    console.log(`InputTaskAreaで定義した関数`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `これはhandleNameChangeで呼び出しています =>  ${e.target.value}`
    );
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `これはhandlePersonChangeで呼び出しています =>  ${e.target.value}`
    );
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `これはhandleDeadlineChangeで呼び出しています =>  ${e.target.value}`
    );
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
