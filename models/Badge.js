var keystone = require('keystone'),
  Types = keystone.Field.Types,
  passportLocalMongoose = require('passport-local-mongoose');

/**
 * Badge Model
 * ==========
 */

var Badge = new keystone.List('Badge', {
  track: true,
  autokey: { path: 'slug', from: 'name', unique: true },
});

Badge.add({
  name: { type: Types.Name, required: true, index: true },
  avatar: { type: Types.CloudinaryImage, folder: 'badges' },
  });



/**
 * Virtuals
 */


/**
 * Hooks
 */

// Badge.schema.pre('save', function (next) {
//   if (this.location) {
//     this._.location.googleLookup("au", "true",
//       function(err, location, result) {
//         if (err) {
//           console.log('Error getting Address from Google ' + err);
//           next();
//         }
//         else {
//           console.log('Address succesfully checked with Google ');
//           console.dir(location);
//           next();
//         }
//       }
//     );
//   }
// })
//
//
// /**
//  * Relationships
//  */
//
// Badge.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
// Badge.relationship({ ref: 'Doll', path: 'dolls', refPath: 'owner' });
// Badge.relationship({ ref: 'CommunityLink', path: 'links', refPath: 'owner' });


/**
 * Registration
 */

Badge.defaultColumns = 'name, avatar';
Badge.register();
