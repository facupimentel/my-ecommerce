class Manager {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readAll = async (filter) => {
    try {
      const all = await this.model.find(filter)
      return all;
    } catch (error) {
      throw error;
    }
  };

  readMongo = async () => {
    try {
      const all = await this.model.find().lean()
      return all;
    } catch (error) {
      throw error;
    }
  };

  readBy = async (data) => {
    try {
      const one = await this.model.findOne(data).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const one = await this.model.findById(id);
      return one;
    } catch (error) {
      throw error;
    }
  };

  updateById = async (id, data) => {
    try {
        const one = await this.model.findByIdAndUpdate(id, data);
        return one;
    } catch (error) {
      throw error;
    }
  };

  destroyById = async (id) => {
    try {
        const one = await this.model.findByIdAndDelete(id);
        return one
    } catch (error) {
      throw error;
    }
  };
}

export default Manager