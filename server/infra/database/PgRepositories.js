const BaseRepository = require('./BaseRepository');

class CaptureRepository extends BaseRepository {
  constructor(session) {
    super('capture', session);
    this._tableName = 'capture';
    this._session = session;
  }

  async getByFilter(filterCriteria, options) {
    console.log('PG REPOSITORY DB getByFilter', filterCriteria, options);
    const query = !!Object.keys(filterCriteria).length
      ? filterCriteria
      : `id` > 10;
    return await this._session
      .getDB()
      .where(filterCriteria)
      .select(
        'id',
        'reference_id',
        'tree_id',
        'image_url',
        'lat',
        'lon',
        'estimated_geometric_location',
        'gps_accuracy',
        'planter_id',
        'planter_photo_url',
        'planter_username',
        'planting_organization_id',
        'device_identifier',
        'species_id',
        'morphology',
        'age',
        'note',
        'domain_specific_data',
        'attributes',
        'status',
        'created_at',
        'updated_at',
      )
      .from('treetracker.capture')
      .orderBy('created_at', 'desc')
      .limit(options.limit)
      .offset(options.offset);
  }

  async add(capture) {
    console.log('PG REPOSITORY DB getByFilter', capture);
    return await super.create(capture);
  }
}

class EventRepository extends BaseRepository {
  constructor(session) {
    super('domain_event', session);
    this._tableName = 'domain_event';
    this._session = session;
  }

  async add(domainEvent) {
    return await super.create(domainEvent);
  }
}

module.exports = {
  CaptureRepository,
  EventRepository,
};
