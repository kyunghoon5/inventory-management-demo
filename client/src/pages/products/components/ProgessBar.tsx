interface ProgessBarProps {
  progress: number;
  height: number;
}

const ProgessBar = ({ progress, height }: ProgessBarProps) => {
  const Parentdiv = {
    height: height,
    width: '80px',
    backgroundColor:
      progress > 70 ? '#DBF0E2' : progress > 30 ? '#F9C897' : '#F2CBBD',
    borderRadius: 40,
    margin: 5,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor:
      progress > 70 ? 'lightgreen' : progress > 30 ? '#FB942D' : 'red',
    borderRadius: 40,
    textAlign: 'right' as const,
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}></span>
      </div>
    </div>
  );
};

export default ProgessBar;
