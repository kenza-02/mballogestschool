module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        genre: { type: String, required: true },
        classe: { type: mongoose.Schema.Types.ObjectId, ref: 'classe' },
        date_naiss:{ type: Date, required: true }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const  Inscription = mongoose.model("inscription", schema);
    return Inscription;
  };
  