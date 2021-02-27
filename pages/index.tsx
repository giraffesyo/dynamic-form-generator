import GeneratedForm from '../components/GeneratedForm'

const HardcodedJSONString = JSON.stringify({
  name: 'default name',
  size: 4,
  dateOfBirth: '11/20/1980',
  color: 'blue',
  male: true,
})

// const DetermineInputType = (key: string, value: TJ)

const IndexPage = () => {
  return <GeneratedForm json={HardcodedJSONString} />
}

export default IndexPage
