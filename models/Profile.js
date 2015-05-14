var keystone = require('keystone'),
  Types = keystone.Field.Types,
  sanitizer = require('sanitizer');

/**
 * Profile Model
 * ==========
 */

var Profile = new keystone.List('Profile', {
  // NOTE: unique?
  autokey: { path: 'slug', from: 'user userName', unique: true }
});

Profile.add({
  user: { type: Types.Relationship, ref: 'User', index: true },
  // dolls: { type: Types.Relationship, ref: 'User', index: true },
  state: { type: Types.Select, options: 'private, public', default: 'public', required: true },
  // Should this be unique somehow?
  userName: { type: Types.Text, required: true, initial: true, index: true },
  emailShow: { type: Boolean, label: 'Show email address?' },
  location_show: { type: Types.Boolean,  label: 'Show location?' },
  avatar: { type: Types.CloudinaryImage },
  about: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
});

/**
 * Hooks
 */

//  Profile.schema.pre('save', function(next) {
//     this.about.brief = sanitizer.sanitize(this.about.brief);
//     this.about.extended = sanitizer.sanitize(this.about.extended);
//     next();
// });

/**
 * Relationships
 */

Profile.relationship({ ref: 'CommunityLink', path: 'links', refPath: 'owner' });


/**
 * Registration
 */

Profile.defaultColumns = 'userName, avatar, about.brief';
Profile.register();
