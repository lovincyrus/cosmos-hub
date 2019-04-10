import ShowBlocks from '../components/showBlocks'
import CheckBlocks from '../components/checkBlocks'

export default function Home() { 
  return (
    <React.Fragment>
      <h1>Cosmos Hub Blockchain</h1>
      <CheckBlocks />
      <ShowBlocks />

      <style jsx global>
      {`
        html {
          font-family: Helvetica,Calibri,Arial,sans-serif;
          background-color: #fafafa;
        }

        h1 {
          font-weight: 700;
          color: #333;
          font-size: 2.4em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
      </style>
    </React.Fragment>
  )
}