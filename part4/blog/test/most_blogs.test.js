const listHelper = require('../utils/list_helper');

describe('most blogs', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Chavín',
      author: 'Julio C Tello',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'The myth of sisyphus',
      author: 'Albert Camus',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0,
    },
  ];
  test('of a bigger list is calculated right', () => {
    const { author, blogsCount } = listHelper.mostBlogs(listWithManyBlogs);
    expect(author).toBe('Edsger W. Dijkstra');
    expect(blogsCount).toBe(2);
  });
});
