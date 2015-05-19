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
  password: { type: Types.Password, initial: true, required: true },
  profile: {
    userName: { type: Types.Text, required: true, initial: true, index: true },
    emailShow: { type: Boolean, label: 'Show email address?' },
    location_show: { type: Types.Boolean,  label: 'Show location?' },
    avatar: { type: Types.CloudinaryImage },
    about: {
      brief: { type: Types.Html, wysiwyg: true, height: 150 },
      extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
  }},
  'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

/**
 * Virtuals
 */

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

User.schema.virtual('fullAddress').get(function() {
  if (this.location) {
    return this.location.name + " " +
      this.number + " " +
      this.street1 + " " +
      this.street2 + " " +
      this.suburb + " " +
      this.state + " " +
      this.postcode + " " +
      this.country;
      // this.geo;
  }
});


/**
 * Hooks
 */

User.schema.pre('save', function (next) {
  if (this.location) {
    this._.location.googleLookup("au", "true",
      function(err, location, result) {
        if (err) {
          console.log('Error getting Address from Google ' + err);
          next();
        }
        else {
          console.log('Address succesfully checked with Google ');
          console.dir(location);
          next();
        }
      }
    );
  }
})


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Doll', path: 'dolls', refPath: 'owner' });
User.relationship({ ref: 'CommunityLink', path: 'links', refPath: 'owner' });


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
