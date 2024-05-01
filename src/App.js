// App.js
import React from 'react';
import Header from './Header';
import Section from './Section';
import IMAGES from './images/index1.js';
import BP from './images/Ball Pivot.png';
import Fish from './images/Poisson.png';
import beanOG from './images/beanOriginal.png';
import beanReconstructed from './images/beanReconstructed.png';
// import vid1 from './images/ball radius.mov';
import './App.css';
function App() {
  return (
    <div>
      <Header />
      <Section title='Abstract'>
        <p>
          {' '}
          This report elucidates the ongoing development of a Point Cloud Mesh
          Reconstruction system, aiming to convert point cloud inputs into
          usable mesh representations. A point cloud is a collection of points
          along with surface normals, representing/capturing an implied surface.
          Hence, the goal of mesh reconstrution is to infer an actual surface,
          in the form of a triangle mesh, from just the data of a point cloud.
          We have successfully implemented the Ball Pivot Approximation
          algorithm (BPA), and have additionally added user functionality for
          running the algorithm. The project also involves testing the system
          against a repository of existing 3D mesh models to give a
          demonstration of the accuracy of the BPA algorithm. Additionally, we
          tested the algorithm on datasets lacking pre-existing meshes.
        </p>
      </Section>
      <Section title='Technical Approach'>
        <p>
          The technical approach primarily revolves around implementing the Ball
          Pivot Approximation algorithm as outlined in the referenced paper.
          This algorithm operates by rolling an imaginary ball along the given
          point cloud, adding triangles to the mesh where the ball touches three
          points. Our implementation maintains an advancing front of the
          constructed mesh, meaning there is a boundary of 'active edges,'
          separating the so-far constructed mesh from the points which are yet
          to be incoporated into the mesh. We iteratively finding new triangles
          to add by pivoting along these boundary edges. Key functions include
          ballPivot for identifying the first point reached during pivoting,
          findSeedTriangle for initiating a new front if remaining vertices
          exist, and join and glue for modifying boundary edge topology. We will
          discuss these one by one.
        </p>

        <img
          src={BP}
          alt='Ball Pivot Illustration'
          style={{ display: 'block', margin: '20px auto' }}
        />
        <p>
          {' '}
          Firstly, we use the findSeedTriangle function to find a place to
          initialize the boundary. The important part of finding such a triangle
          is that the ball defined by the seed triangle must not contain any
          other point. This search is done in somewhat of a brute force search.
          Though we ensure to search points that are roughly close to each
          other, as far away points have a much less likely chance of being
          valid seed triangles. It should also be noted that findSeedTriangle
          may be used multiple times if the surface being reconstructed has
          multiple components. To detect this, we check to see if there are any
          remaining unused points after the current boundary is finished
          advancing.
        </p>
        <p>
          Next, we have the <underline>ballPivot</underline> function. This
          funtions hosts the geometric heart of the algorithm, and is where most
          of the mathematical calculations are done. BallPivot takes an edge
          along the current boundary, and identifies the first point in the
          point cloud that is hit when a ball is rolled along this edge. This is
          the first step in adding a triangle to the mesh, as it identifies a
          candidate triangle to add. However, it is not always the case that we
          add this triangle to the mesh, as it may introduce nonmanifold
          topology.{' '}
        </p>
        <p>
          {' '}
          Finally, if it is decided that the triangle can successfully be added
          to the mesh, we must update the current boundary to reflect this
          change. This is where we use join and glue operations. Join is used to
          add two new edges around the newly added triangle. However, in some
          instances, this ill end up with the boundary interesting itself. In
          this case, we use the glue operation to remove this flaw with the
          boundary, so that we maintain that the other side of a boundary edge
          is always outside of the currently constructed mesh.{' '}
        </p>

        <p>
          Besides these functions, we used some data structures to keep track of
          the details of the algorithm. To start, the point cloud itself is
          stored as a list of 3D points, and a matching list of surface normals.
          Throughout the algorithm, we use indices into these lists to refer to
          points, as opposed to the actual points themselves. This is both for
          ease of linking a point to its normal, and for the simplicity of
          identifying points.
        </p>
        <p>
          For the algirithm itself, we used two main data structures. To store
          the advancing front, we used a list of doubly linked lists of edges.
          The resaon we need multiple linked lists is that the boundary may
          split in two during glue operations. Each edge stores its two points,
          as well as the center of the ball used to define the triangle it is a
          part of. This center is necessary to know where to start the ball
          rolling in ballPivot steps. The second data structure we used was a
          grid of voxels, used for storing the point cloud in a way that allowed
          for accessing nearby points more easily. Throughout the geometric
          steps above, (ballPivot and findSeedTriangle), it is only necessary to
          know the points that are nearby when doing searches. Thus, it would be
          a large waste of time to do searches across the entire point cloud,
          when each step is only a local operation.{' '}
        </p>
      
        <br/>
        
        <p>
          On the other hand, Poisson surface reconstruction leverages the
          principles of implicit surface modeling to generate a smooth and
          continuous mesh from the input point cloud. By formulating the
          reconstruction problem as a Poisson equation, the algorithm seeks to
          find a function that best fits the input points while adhering to
          certain boundary conditions. This approach is particularly adept at
          handling noisy or incomplete point cloud data, as it inherently
          incorporates regularization techniques to ensure robustness and
          fidelity in the reconstructed mesh.
        </p>
        <div className='image-container'>
          <img
            src={Fish}
            alt='Poisson reconstruction Illustration'
            title='Possion'
            width='1000'
            height='450'
            style={{ display: 'block', margin: '20px auto' }}
          />
          <div className='tooltip'>Poisson</div>
        </div>
      </Section>
      <Section title='Problems Encountered and Solutions:'>
        <p>
          One significant challenge encountered was the debugging process,
          requiring meticulous attention to detail to resolve issues and ensure
          the reliability of the algorithm. There were two significant sources
          for the majority of the difficulty of debugging the algorithm. The
          first was that for a majority of the algorithm debugging process, we
          had not yet made a means of visualizing the point cloud itself. This
          made it difficult to see what was going wrong and to figure out what
          might be the cause of the mistakes in the algorithm. Once we made a
          visualization for the point cloud, debugging was significantly sped
          up. The second cause for headache was a misunderstanding of the
          polygon mesh to half-edge mesh conversion program we were using out of
          the box. This led to us trying to fix a problem in the algorithm that
          didn't exist, per se, when the real issue was a misuse of the mesh
          visualization aspect of the program.
        </p>
        <p>
          As a general approach to tackle these challenges, a systematic
          approach to debugging and problem-solving was employed, leveraging
          collaborative efforts within the project team. Regular testing and
          validation procedures help identify and address issues in a timely
          manner, ensuring steady progress towards project goals.
        </p>
        <p>
          Finally, there is a fundamental limitation of the algorithm itself,
          which has to do with deciding the radius of the ball to use.
          Essentially, if the radius is too big, then areas of the surface that
          have tight curvature will not be detected by rolling the ball over
          (see the image ). Whereas, if the radius is not large enough, it may
          percieve boundaries of the surface where there aren't any if there are
          gaps in the point cloud that are bigger than the ball itself.
        </p>
      </Section>
      <Section title='Lessons Learned'>
        <p>
          {' '}
          Through the development process, valuable lessons have been learned
          regarding the complexities of mesh reconstruction from point cloud
          data. The importance of thorough testing and validation, as well as
          the need for effective communication and collaboration within the
          project team, has been underscored. Additionally, the iterative nature
          of algorithm development highlights the significance of adaptability
          and flexibility in responding to challenges and refining the system.
          These lessons serve as valuable insights for future projects in the
          field of point cloud to mesh conversion.
        </p>

        <p>
          One important lesson we learned was to devote more time towards
          planning out the development process before diving straight in to
          coding. Given that we had done this, we would have likely
          opted to first create a point cloud visualization first, seeing as we
          could use that for the next step in the development process. Instead,
          we went first for the interesting, fun part of the project, ultimately
          leading to a longer and more arduous project experience.
        </p>

        <p>
          Perhaps another important lesson we learned was a lesson in scope.
          Initially, we had plans to do much more with the project, though we
          did not end up accomplishing these goals.
        </p>
      </Section>
      <Section title='Results'>
        <p>
          {' '}
          Below is a comparison between an existing mesh, and the reconstructed mesh
          obtained by running the algorithm on just the vertices of the original
          mesh:
        </p>
        <div align='middle'>
          <table>
            <tr align="center">
              <td>
                <img
                  src={beanOG}
                  alt='Poisson reconstruction Illustration'
                  title='Original'
                  width='80%'
                  height='80%'
                />
                <figcaption>Original</figcaption>
              </td>
              <td>
                <img
                  src={beanReconstructed}
                  alt='Poisson reconstruction Illustration'
                  title='Reconstructed'
                  width='80%'
                  height='80%'
                />
                <figcaption>Reconstructed</figcaption>
              </td>
            </tr>
          </table>
        </div>
        <br/>
        <p>
          There are in fact some noticable differences in our reconstructed mesh vs the original. In our mesh,
          the diamonds are split into triangles by one on top and one on the bottom, whereas in the original
          the diamonds are split left and right. Note, though, that one could get from one to the other by edge flip operations. 
        </p>
        <div>
          Here is the full demo demonstrating the algorithm running on the bunny point cloud using various ball radii (
          <a href='https://www.youtube.com/watch?v=kvoJlMnLQ1I'>
            youtube.com/watch?v=kvoJlMnLQ1I
          </a>
          ):
        </div>
        <div className='image-container'>
          <iframe
            width='1200'
            height='900'
            src='https://www.youtube.com/embed/kvoJlMnLQ1I?autoplay=1&loop=1&playlist=kvoJlMnLQ1I&controls=1'
            title=''
            frameborder='0'
            allow='accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
            style={{ display: 'block', margin: '20px auto' }}
          ></iframe>
        </div>
      </Section>
      <Section title='References'>
        <a href='http://mesh.brown.edu/taubin/pdfs/bernardini-etal-tvcg99.pdf'>
          {' '}
          The Ball-Pivoting Algorithm for Surface Reconstruction{' '}
        </a>
        <br></br>
        <a href='https://www.researchgate.net/publication/325186192_A_Lightweight_Surface_Reconstruction_Method_for_Online_3D_Scanning_Point_Cloud_Data_Oriented_toward_3D_Printing'>
          {' '}
          Poisson Surface Reconstruction{' '}
        </a>
      </Section>
    </div>
  );
}

export default App;
