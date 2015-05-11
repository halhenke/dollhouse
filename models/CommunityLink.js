var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * CommunityLink Model
 * ==========
 */

var CommunityLink = new keystone.List('CommunityLink', {
  // NOTE: unique?
  autokey: { path: 'slug', from: 'user userName', unique: true }
});

CommunityLink.add({
  title: { type: Types.Text, initial: true },
  link: { type: Types.Url, required: true, initial: true },
  description: { type: Types.Text, initial: true },
  owner: { type: Types.Relationship, ref: 'Profile', index: true },
  keyWords: { type: Types.Text, initial: true },
  image: { type: Types.CloudinaryImage },
  approved: { type: Types.Boolean, required: true, default: false, initial: true, index: true,
    note: "An admin must approve a user submitted link for it to be displayed..."}
});

/**
 * Relationships
 */

// Profile.relationship({ ref: 'User', path: 'users', refPath: 'author' });

/**
 * Virtuals
 */
 // A method to notify an admin when a new one is created?


/**
 * Registration
 */

CommunityLink.defaultColumns = 'owner, title, link, description';
CommunityLink.register();
