import ShowBlocks from '../components/showBlocks'
import CheckBlocks from '../components/checkBlocks'

export default function Home() { 
  return (
    <React.Fragment>
      <h1>Cosmos Block Explorer</h1>
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

        @media (max-width: 400px) {
          h1 {
            font-size: 1.6em;
          }
        }
      `}
      </style>
    </React.Fragment>
  )
}