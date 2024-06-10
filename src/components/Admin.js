import React from 'react';
import { auth } from '../firebase';
import Login from './Login';
import Registration from './Registration';
import AddVideo from './AddVideo'; // Your main component after login

function Admin() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <AddVideo /> // Render your main component after login
      ) : (
        <div>
          <Login />
          <Registration />
        </div>
      )}
    </div>
  );
}

export default Admin;
