import "../App.css";
import React, {useEffect} from "react";
import { USER_QUERY, USER_SUBSCRIPTIONS } from "../graphql"
import { useQuery } from '@apollo/react-hooks';


const FriendBar = () => {
    const { loading, error, data, subscribeToMore, refetch } = useQuery(USER_QUERY);
    console.log(["data",data])
    useEffect(() => {
      try {
        subscribeToMore({
          document: USER_SUBSCRIPTIONS,
          updateQuery: async (prev) => {
            console.log(["prev", prev])
            await refetch();
            console.log(["data",data])
            return prev;
          },
        });
      } catch (e) {console.log("subscription problem")}
    }, [data]);
    return (
        <>
            <div className="friends">
                
            {loading ? (
                    <p>Loading...</p>
                ): error ? (
                    <p>{error}</p>
                ):  data.users === null ? (
                    {}
                ):( data.users.map((user) => {
                    return <div class="scrollselect-item">
                        <h2 className="select-h2">{user.name}</h2>
                        <div className="avatar-bg">
                            <svg className=" friend-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                            </svg>  
                        </div>       
                    </div>
                }))}
            </div>
        </>
    );
};

export default FriendBar