import PlanningCenterRepository from "./PlanningCenterRepository.js";

class PeopleRepository extends PlanningCenterRepository {
  constructor() {
    super();
  }

  async GetPeople() {
    return await this.Get("/people/v2/people");
  }

  async GetPersonById(personId) {
    return await this.Get(`/people/v2/people/${personId}`);
  }
}

export default PeopleRepository;
