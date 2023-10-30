import React, { useContext } from 'react';
import Button from '../components/Button';
import { addNote } from '../utils/api';
import { LuSend } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import useInput from '../Hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Alert from '../components/Alert';

function AddPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const [title, setTitle] = useInput();
  const [body, setBody] = useInput();
  const {
    isError,
    error: errorMessage,
    mutate,
  } = useMutation({
    mutationKey: 'createNote',
    mutationFn: (variables) => addNote(variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activeNotes'], exact: true });
      queryClient.setQueryData(['activeNotes'], (oldData) => {
        oldData.push(data);
      });
      navigate('/');
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ title, body });
  };

  return (
    <main>
      <form className="form">
        <div className="input-group">
          <label htmlFor="title">{locale === 'en' ? 'Title' : 'Judul'}</label>
          <input
            type="text"
            placeholder={
              locale === 'en'
                ? 'Take Care of Cute Shiba . . .'
                : 'Menjaga Shiba Yang Lucu . . . '
            }
            onChange={setTitle}
            value={title}
          />
        </div>
        <div className="input-group">
          <label htmlFor="desc">{locale === 'en' ? 'Description' : 'Deskripsi'}</label>
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder={
              locale === 'en'
                ? 'Something About Your Beloved Shiba . . .'
                : 'Hal Apa pun Tentang Shiba Tercinta . . .'
            }
            onChange={setBody}
            value={body}
          ></textarea>
        </div>
        <div className="button-group">
          <Button onSubmitHandler={onSubmitHandler} Icon={LuSend}>
            Add It !
          </Button>
        </div>
      </form>
      <Alert message={errorMessage} show={isError} />
    </main>
  );
}

export default AddPage;
