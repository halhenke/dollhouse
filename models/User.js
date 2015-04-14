var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  location: { type: Types.Location,
    note: "Sharing your location helps you locate others who may be near you",
    initial: true, collapse: true },
  password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Doll', path: 'dolls', refPath: 'owner' });


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
