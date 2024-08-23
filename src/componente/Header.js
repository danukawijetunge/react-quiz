function Header({ totalPoints, points }) {
  console.log(`total number of questing count ${totalPoints}`);
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>The React Quiz</h1>
      <h4>{points}</h4>
      <h4>/</h4>
      <h4>{totalPoints}</h4>
    </header>
  );
}

export default Header;
