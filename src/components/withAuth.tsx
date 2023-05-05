import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === 'loading') {
      return (<div>Loading...</div>);
    }

    if (!session) {
      router.replace('/login');
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;