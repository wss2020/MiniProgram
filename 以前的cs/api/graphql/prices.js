const query = `query GetFuelById($fuelId: String!, $electricityId: String!) {
  getFuelById(id: $fuelId) {
    id
    diesel {
      date
      price
    }
    gasoline {
      date
      price
    }
  }
  getElectricityById(id: $electricityId) {
    id
    average
  }
}
`

export default query