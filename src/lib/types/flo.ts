export interface FloArtist {
  id: number;
  name: string;
  type: string;
}

export interface FloAlbumImage {
  size: number;
  url: string;
}

export interface FloAlbum {
  type: string;
  id: number;
  imgList: FloAlbumImage[];
  title: string;
  releaseYmd: string;
}

export interface FloRank {
  newYn: string;
  rankBadge: number;
}

export interface FloTrack {
  id: number;
  name: string;
  updateDateTime: string;
  representationArtist: FloArtist;
  artistList: FloArtist[];
  album: FloAlbum;
  rank: FloRank;
  agencyId: number;
  fileUpdateDateTime: string;
  freeYn: string;
  displayYn: string;
  adultAuthYn: string;
  svcDrmYn: string;
  svcStreamingYn: string;
  unReleasedYn: string;
}

export interface FloChartResponse {
  trackList: FloTrack[];
}

export interface ProcessedFloTrack {
  rank: number;
  title: string;
  artist: string;
  albumTitle: string;
  isNew: boolean;
  updateTime: string;
}
