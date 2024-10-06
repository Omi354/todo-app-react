import { useId } from "react";
import "./App.css";

type TextInputProps = {
  label: string;
  // Qiitaネタ => undefinedとnullの違い
  placeholder: string | undefined;
  inputType: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type RegisterBtnProps = {
  // Qiitaネタ => void と () => void
  onRegisterBtnClick: () => void;
};

const TextInput: React.FC<TextInputProps> = ({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`これはInputTaskAreaで呼び出しています =>  ${e.target.value}`);
  };

  return (
    <div className="inputTaskArea">
      <TextInput
        label="タスク名"
        placeholder="タスク名を入力"
        inputType="text"
        onInputChange={handleInputChange}
      />
      <TextInput
        label="担当者"
        placeholder="担当者を入力"
        inputType="text"
        onInputChange={handleInputChange}
      />
      <TextInput
        label="期限"
        placeholder=""
        inputType="date"
        onInputChange={handleInputChange}
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
