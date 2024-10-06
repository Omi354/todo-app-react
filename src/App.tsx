import { useId } from "react";
import "./App.css";

type TextInputProps = {
  label: string;
  // Qiitaネタ => undefinedとnullの違い
  placeholder: string | undefined;
  inputType: string;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  inputType,
}) => {
  // Qiitaネタ => idを使いたいときの設定
  const id = useId();
  return (
    <div className="input">
      <label htmlFor={id} className="input_label">
        {label}
      </label>
      <input id={id} type={inputType} placeholder={placeholder} />
    </div>
  );
};

// const RegisterBtn: React.FC = (onRegisterBtnClick) => {
//   return (
//     <div className="registerBtn">
//       <button onClick={onRegisterBtnClick}>登録</button>
//     </div>
//   );
// };

const RegisterBtn: React.FC = () => {
  return (
    <div className="registerBtn">
      <button>登録</button>
    </div>
  );
};

const InputTaskArea: React.FC = () => {
  // const handleRegisterBtnClick = () => {
  //   console.log(`InputTaskAreaで定義した関数`)
  // }

  return (
    <div className="inputTaskArea">
      <TextInput
        label="タスク名"
        placeholder="タスク名を入力"
        inputType="text"
      />

      <TextInput label="担当者" placeholder="担当者を入力" inputType="text" />
      <TextInput label="期限" placeholder="" inputType="date" />
      <RegisterBtn />
      {/* <RegisterBtn onRegisterBtnClick={handleRegisterBtnClick} /> */}
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
