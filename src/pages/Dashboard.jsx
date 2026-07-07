export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="dashboard">
      <h2>{currentDate}</h2>
    </div>
  );
}
