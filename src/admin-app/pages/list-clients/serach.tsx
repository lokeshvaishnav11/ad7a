import React, { useState } from "react";
import axios from "axios";

interface Parent {
  _id: string;
  username: string;
  code: string;
  isLogin: boolean;
}

interface UserData {
  user: {
    username: string;
    code: string;
    isLogin: boolean;
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
        `http://localhost:3010/api/user-p-serach?userId=${encodeURIComponent(
          userId.trim()
        )}`
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const StatusBadge = ({ isLogin }: { isLogin: boolean }) => {
    const online = isLogin === true;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          minWidth: 90,
          padding: "7px 12px",
          borderRadius: 50,
          fontSize: 12,
          fontWeight: 700,
          color: online ? "#067647" : "#b42318",
          background: online ? "#ecfdf3" : "#fef3f2",
          border: online
            ? "1px solid #abefc6"
            : "1px solid #fecdca",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: online ? "#12b76a" : "#f04438",
            boxShadow: online
              ? "0 0 0 3px rgba(18,183,106,.12)"
              : "0 0 0 3px rgba(240,68,56,.10)",
          }}
        />

        {online ? "Online" : "Offline"}
      </span>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2f7 50%, #e8edf5 100%)",
        padding: "35px 20px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 950,
          margin: "0 auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#101828",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            User Details Search
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#667085",
              fontSize: 14,
            }}
          >
            Search user and view complete hierarchy & login status
          </p>
        </div>

        {/* ================= SEARCH CARD ================= */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            border: "1px solid #e4e7ec",
            boxShadow: "0 4px 14px rgba(16,24,40,.05)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #020421 0%, #07134d 100%)",
              padding: "18px 22px",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Search User
            </div>

            <div
              style={{
                fontSize: 12,
                opacity: 0.7,
                marginTop: 3,
              }}
            >
              Enter username or user ID
            </div>
          </div>

          <div
            style={{
              padding: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <input
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter User ID"
                style={{
                  flex: "1 1 400px",
                  height: 50,
                  borderRadius: 10,
                  border: error
                    ? "1px solid #f04438"
                    : "1px solid #d0d5dd",
                  padding: "0 15px",
                  fontSize: 15,
                  color: "#101828",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fff",
                }}
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  minWidth: 145,
                  height: 50,
                  border: 0,
                  borderRadius: 10,
                  background: loading ? "#667085" : "#020421",
                  color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "0 22px",
                  boxShadow: "0 3px 8px rgba(2,4,33,.18)",
                }}
              >
                {loading ? "Searching..." : "Search User"}
              </button>
            </div>

            {error && (
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 13px",
                  borderRadius: 8,
                  background: "#fef3f2",
                  color: "#b42318",
                  border: "1px solid #fecdca",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>

        {/* ================= RESULT ================= */}

        {user && (
          <div
            style={{
              marginTop: 20,
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e4e7ec",
              boxShadow: "0 4px 14px rgba(16,24,40,.05)",
              overflow: "hidden",
            }}
          >
            {/* RESULT HEADER */}

            <div
              style={{
                padding: "17px 20px",
                borderBottom: "1px solid #eaecf0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#101828",
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  User Hierarchy
                </div>

                <div
                  style={{
                    color: "#667085",
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {user.parents.length} parent
                  {user.parents.length !== 1 ? "s" : ""} found
                </div>
              </div>

              <StatusBadge isLogin={user.user.isLogin} />
            </div>

            {/* TABLE */}

            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: 650,
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
                    <th
                      style={{
                        padding: "14px 18px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 700,
                        width: 80,
                      }}
                    >
                      LEVEL
                    </th>

                    <th
                      style={{
                        padding: "14px 18px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      USERNAME
                    </th>

                    <th
                      style={{
                        padding: "14px 18px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      CODE
                    </th>

                    <th
                      style={{
                        padding: "14px 18px",
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        width: 140,
                      }}
                    >
                      STATUS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {user.parents.map((item, index) => (
                    <tr
                      key={item._id}
                      style={{
                        background: index % 2 === 0 ? "#fff" : "#f9fafb",
                      }}
                    >
                      <td
                        style={{
                          padding: "15px 18px",
                          borderBottom: "1px solid #eaecf0",
                        }}
                      >
                        <span
                          style={{
                            background: "#f2f4f7",
                            color: "#344054",
                            padding: "5px 9px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          P{index + 1}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "15px 18px",
                          borderBottom: "1px solid #eaecf0",
                          color: "#101828",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {item.username || "-"}
                      </td>

                      <td
                        style={{
                          padding: "15px 18px",
                          borderBottom: "1px solid #eaecf0",
                          color: "#475467",
                          fontSize: 14,
                        }}
                      >
                        {item.code || "-"}
                      </td>

                      <td
                        style={{
                          padding: "15px 18px",
                          borderBottom: "1px solid #eaecf0",
                          textAlign: "center",
                        }}
                      >
                        <StatusBadge isLogin={item.isLogin} />
                      </td>
                    </tr>
                  ))}

                  {/* ================= CURRENT USER ================= */}

                  <tr
                    style={{
                      background: "#f0fdf4",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px 18px",
                        borderTop: "2px solid #bbf7d0",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          background: "#16a34a",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        USER
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        borderTop: "2px solid #bbf7d0",
                        color: "#101828",
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      {user.user.username || "-"}
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        borderTop: "2px solid #bbf7d0",
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {user.user.code || "-"}
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        borderTop: "2px solid #bbf7d0",
                        textAlign: "center",
                      }}
                    >
                      <StatusBadge isLogin={user.user.isLogin} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;