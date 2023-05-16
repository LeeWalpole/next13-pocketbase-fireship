migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lmwa2ny6lctb9mt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b5xhsuhd",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [
        "200x300"
      ],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lmwa2ny6lctb9mt")

  // remove
  collection.schema.removeField("b5xhsuhd")

  return dao.saveCollection(collection)
})
