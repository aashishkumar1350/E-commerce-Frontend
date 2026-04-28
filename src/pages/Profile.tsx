import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [editing, setEditing] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    // 🔥 For now local update (later connect API)
    const updatedUser = { ...user, name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
    alert("Profile updated");
  };

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 🔥 call API later
    alert("Password updated");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE (PROFILE CARD) */}
        <div className="bg-card p-6 rounded-2xl shadow text-center">
          
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="avatar"
            className="w-20 h-20 mx-auto rounded-full mb-4"
          />

          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>

          <span className="mt-2 inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
            {user.role}
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* PROFILE INFO */}
          <div className="bg-card p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Profile Info</h2>
              <Button
                size="sm"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="space-y-4">
              <input
                disabled={!editing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                disabled={!editing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {editing && (
              <Button className="mt-4" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>

          {/* CHANGE PASSWORD */}
          <div className="bg-card p-6 rounded-2xl shadow">
            <h2 className="font-semibold text-lg mb-4">
              Change Password
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <Button
              className="mt-4"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}