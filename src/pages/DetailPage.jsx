/* eslint-disable indent */
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxArchive } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { getNote, archiveNote, deleteNote, unarchiveNote } from '../utils/api';
import { getRandomColor, getLetter } from '../utils/helper';
import Button from '../components/Button';
import LocaleContext from '../contexts/LocaleContext';
import LoadingScreen from '../components/LoadingScreen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function DetailPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const {
    data: note = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  });

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  const { mutate: onArchiveHandler } = useMutation({
    mutationFn: archiveNote,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes) => {
        const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

        return newActiveNotes;
      });
      queryClient.setQueryData(['archivedNotes'], (oldActiveNotes) => {
        const cachedNote = queryClient.getQueryData(['note', variables]);

        return [...oldActiveNotes, { ...cachedNote, archived: true }];
      });
      navigate('/');
    },
  });

  const { mutate: onUnarchiveHandler } = useMutation({
    mutationFn: unarchiveNote,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['archivedNotes'], (oldActiveNotes) => {
        const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

        return newActiveNotes;
      });
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes) => {
        const cachedNote = queryClient.getQueryData(['note', variables]);

        return [...oldActiveNotes, { ...cachedNote, archived: false }];
      });
      navigate('/');
    },
  });

  const { mutate: onDeleteHandler } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes) =>
        oldActiveNotes.filter((note) => note.id !== variables)
      );
      queryClient.setQueryData(['archivedNotes'], (oldArchivedNotes) =>
        oldArchivedNotes.filter((note) => note.id !== variables)
      );
      navigate('/');
    },
  });

  const color = getRandomColor();
  const letter = getLetter(note.title || '');

  return (
    <main>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="detail-container">
            <div className="input-group" style={{ backgroundColor: color }}>
              <span style={{ color }} className="mini-box">
                {letter}
              </span>
              <h1>{note?.title}</h1>
            </div>
            <div className="input-group">
              <p style={{ minHeight: '10rem' }}>{note?.body}</p>
            </div>
            <div className="button-group">
              <Button
                id={note?.id}
                onSubmitHandler={
                  note?.archived
                    ? () => onUnarchiveHandler(id)
                    : () => onArchiveHandler(id)
                }
                Icon={RxArchive}
              >
                {locale === 'en'
                  ? note?.archived
                    ? 'Unarchive It'
                    : 'Archive It'
                  : note?.archived
                  ? 'Batal Arsip'
                  : 'Arsipkan'}
              </Button>
              <Button
                id={note?.id}
                onSubmitHandler={() => onDeleteHandler(id)}
                Icon={FiTrash2}
              >
                {locale === 'en' ? 'Delete !' : 'Hapus !'}
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default DetailPage;
