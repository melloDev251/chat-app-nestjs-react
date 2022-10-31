import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConversationById } from '../api';

export function useConversationGuard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = new AbortController();

  useEffect(() => {
    console.log('Fetching Conversation');
    setLoading(true);
    getConversationById(parseInt(id!))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [controller, id]);

  return { loading, error };
}
