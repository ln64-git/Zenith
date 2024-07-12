export interface User {
  id: number;
}

export interface Video {
  ref: React.RefObject<HTMLVideoElement>;
}

export interface UserDisplay {
  displayArray: [User, Video];
}
