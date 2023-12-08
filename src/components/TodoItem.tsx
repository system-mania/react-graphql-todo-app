import { FC, useEffect, useRef, useState } from 'react';
import { IList } from '../types';
import { FiEdit, FiMinusCircle } from 'react-icons/fi';

interface TodoItemProps {
  item: IList;
  handleRemove: (options: { variables: { id: number } }) => void;
  handleUpdate: (options: { variables: IList }) => void;
}

const TodoItem: FC<TodoItemProps> = ({ item, handleRemove, handleUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(item.text);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const handleTextChange = (item: IList) => {
    setEdit(!edit);
    if (edit) {
      handleUpdate({
        variables: item,
      });
    }
  };

  return (
    <li className="flex items-center justify-between p-5 my-3 text-2xl duration-300 hover:scale-105 border-2 rounded-md shadow-md">
      <div className="flex items-center w-10/12">
        <input
          onChange={() =>
            handleUpdate({
              variables: { id: item.id, text: task, checked: !item.checked },
            })
          }
          checked={item.checked}
          type={'checkbox'}
          className="hover:scale-105 hover:cursor-pointer"
        />
        <input
          ref={inputRef}
          type="text"
          disabled={!edit}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={`outline-none h-[25px] text-xl w-full  mx-5 px-3 disabled:bg-transparent focus:border-b-[1px] ${
            item.checked && 'line-through'
          } text-stone-500`}
        />
      </div>
      <div className="flex justify-between w-1/6">
        <FiEdit
          onClick={() =>
            handleTextChange({ id: item.id, text: task, checked: item.checked })
          }
          className="hover:scale-105 hover:cursor-pointer"
        />
        <FiMinusCircle
          onClick={() => handleRemove({ variables: { id: item.id } })}
          className="hover:scale-105 hover:cursor-pointer"
        />
      </div>
    </li>
  );
};

export default TodoItem;
