// import React, { useState } from "react";
// import axios from "axios";

// interface UserResponse {
//   success: boolean;
//   data: {
//     userId: string;
//     parent: {
//       id: string;
//       name: string;
//     };
//     grandParent: {
//       id: string;
//       name: string;
//     };
//   };
// }

// const UserSearch: React.FC = () => {
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState<UserResponse["data"] | null>(null);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!userId.trim()) {
//       setError("Please enter User ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setUser(null);

//       const res = await axios.get<UserResponse>(
//         `http://localhost:3021/api/user-p-serach?userId=${userId}`
//       );

//       setUser(res.data.data);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "User not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f5f7fb",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           width: 650,
//           background: "#fff",
//           borderRadius: 20,
//           padding: 30,
//           boxShadow: "0 10px 30px rgba(0,0,0,.1)",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: 25,
//           }}
//         >
//           User Hierarchy Search
//         </h2>

//         <div
//           style={{
//             display: "flex",
//             gap: 10,
//           }}
//         >
//           <input
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             placeholder="Enter User ID"
//             style={{
//               flex: 1,
//               height: 50,
//               borderRadius: 12,
//               border: "1px solid #ddd",
//               padding: "0 15px",
//               fontSize: 16,
//             }}
//           />

//           <button
//             onClick={handleSearch}
//             disabled={loading}
//             style={{
//               width: 140,
//               border: 0,
//               borderRadius: 12,
//               background: "#2563eb",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: 16,
//               fontWeight: 600,
//             }}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {error && (
//           <div
//             style={{
//               marginTop: 20,
//               color: "red",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {user && (
//           <div
//             style={{
//               marginTop: 30,
//             }}
//           >
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     background: "#2563eb",
//                     color: "#fff",
//                   }}
//                 >
//                   <th style={{ padding: 12 }}>Level</th>
//                   <th style={{ padding: 12 }}>Name</th>
//                   <th style={{ padding: 12 }}>ID</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td style={{ padding: 12 }}>User</td>
//                   <td style={{ padding: 12 }}>-</td>
//                   <td style={{ padding: 12 }}>{user.userId}</td>
//                 </tr>

//                 <tr>
//                   <td style={{ padding: 12 }}>Parent</td>
//                   <td style={{ padding: 12 }}>{user.parent.name}</td>
//                   <td style={{ padding: 12 }}>{user.parent.id}</td>
//                 </tr>

//                 <tr>
//                   <td style={{ padding: 12 }}>Grand Parent</td>
//                   <td style={{ padding: 12 }}>{user.grandParent.name}</td>
//                   <td style={{ padding: 12 }}>{user.grandParent.id}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserSearch;




import React, { useState } from "react";
import axios from "axios";

interface Parent {
  _id: string;
  username: string;
  code: string;
}

interface UserData {
  user: {
    username: string;
    code: string;
  };
  parents: Parent[];
}

interface UserResponse {
  status: boolean;
  data: UserData;
}

const UserSearch: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError("Please enter User ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setUser(null);

      const res = await axios.get<UserResponse>(
        `https://api.a2zlive.shop/api/user-p-serach?userId=${userId}`
      );

      if (res.data.status) {
        setUser(res.data.data);
      } else {
        setError("User not found");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 750,
          background: "#fff",
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          User Details Search
        </h2>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            style={{
              flex: 1,
              height: 50,
              borderRadius: 12,
              border: "1px solid #ddd",
              padding: "0 15px",
              fontSize: 16,
            }}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              width: 140,
              border: 0,
              borderRadius: 12,
              background: "#020421",
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: 20,
              color: "red",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {user && (
          <div
            style={{
              marginTop: 30,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#020421",
                    color: "#fff",
                  }}
                >
                  {/* <th style={{ padding: 12 }}>Level</th> */}
                  <th style={{ padding: 12 }}>code</th>
                  <th style={{ padding: 12 }}>userName</th>
                </tr>
              </thead>

              <tbody>
                {user.parents.map((item, index) => (
                  <tr key={item._id}>
                    {/* <td
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Parent {index + 1}
                    </td> */}

                    <td
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {item.username}
                    </td>

                    <td
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {item.code}
                    </td>
                  </tr>
                ))}

                <tr
                  style={{
                    background: "#dcfce7",
                    fontWeight: "bold",
                  }}
                >
                  <td style={{ padding: 12 }}>
                    {user.user.username}
                  </td>
                  <td style={{ padding: 12 }}>
                    {user.user.code}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;