import React, { useState } from 'react';
import { searchNotes } from '../utils/helper';
import { getArchivedNotes } from '../utils/api';
import ListItem from '../components/ListItem';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import LoadingScreen from '../components/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import Alert from '../components/Alert';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParams = searchParams.get('title');
  const [query, setQuery] = useState(titleParams || '');
  const {
    data: notes = [],
    isLoading,
    isError,
    error: errorMessage,
  } = useQuery({
    queryKey: ['archivedNotes'],
    queryFn: getArchivedNotes,
  });

  function onSearchHandler(newQuery) {
    setQuery(newQuery);
    setSearchParams({ title: newQuery });
  }

  return (
    <main>
      {isLoading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <ListItem notes={searchNotes(query, notes)} isHome={false} />
          <SearchBox onSearchHandler={onSearchHandler} defaultKey={query} />
        </>
      )}
      <Alert message={errorMessage} show={isError} />
    </main>
  );
}

export default ArchivePage;
