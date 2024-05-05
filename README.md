<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">!AGW
</h1>
</p>
<p align="center">
    <em><code>►Not Another GPT Wrapper</code></em>
</p>
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/GNU%20Bash-4EAA25.svg?style=flat-square&logo=GNU-Bash&logoColor=white" alt="GNU%20Bash">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/Jupyter-F37626.svg?style=flat-square&logo=Jupyter&logoColor=white" alt="Jupyter">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat-square&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat-square&logo=Bootstrap&logoColor=white" alt="Bootstrap">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios">
	<br>
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat-square&logo=OpenAI&logoColor=white" alt="OpenAI">
	<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat-square&logo=Python&logoColor=white" alt="Python">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat-square&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/pandas-150458.svg?style=flat-square&logo=pandas&logoColor=white" alt="pandas">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Flask-000000.svg?style=flat-square&logo=Flask&logoColor=white" alt="Flask">
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)
</details>
<hr>

##  Overview

<code>► ## Inspiration

The inspiration for our project stemmed from the growing interest and utilization of large language models (LLMs) like GPT-3. We noticed that while these models are incredibly powerful, they sometimes struggle with coherence and staying on topic, especially when interacting with user-generated content. This led us to brainstorm a solution that could harness the knowledge and material provided by users to improve the LLM's abilities in a controlled manner.

## What it does

Our project is a web platform designed to enable users, particularly in educational settings such as schools and universities, to contribute their own material and knowledge to enhance the capabilities of large language models. With a safe mode enabled, the chatbot utilizes the information it receives as context, preventing it from generating hallucinated or off-topic responses. Additionally, we developed a method to augment the LLM's knowledge on specific topics, even if it hasn't encountered that data during its training.
The core logic of our system revolves around two components: the llama-indexer, which transforms each sentence of the context into a vector, and a vectorial database that efficiently stores and retrieves this data based on correlations in the vector space.

## How we built it

We built our platform using a combination of programming languages and frameworks. The web interface was constructed using TypeScript with the React framework, while the backend is built in Python.

## Challenges we ran into

One of the primary challenges we encountered was navigating a completely new set of technologies. As a team, we had to familiarize ourselves with various programming languages, frameworks, and libraries to effectively build our platform. Learning the intricacies of this stack while simultaneously orchestrating the components to achieve our goal posed a significant hurdle.

## Accomplishments that we're proud of

We're proud to have developed a functional platform that not only enhances the capabilities of large language models but also empowers users to contribute to their improvement. The integration of the llama-indexer and vectorial database provides a robust foundation for efficiently handling and utilizing user-generated content, paving the way for more effective interactions between humans and AI.

## What we learned

Through this project, we gained valuable insights into the challenges and opportunities associated with leveraging user-generated content to enhance AI capabilities. We learned the importance of balancing safety and creativity in AI interactions, as well as the significance of efficient data indexing and retrieval in large-scale applications. Additionally, we deepened our understanding of natural language processing techniques and vector space modeling, refining our skills in these areas through practical implementation.

## What's next for !AGW

As students enrolled in the Master of Computer Science and Engineering program with a specialization in Artificial Intelligence, our journey doesn't end here; in fact, it's just beginning. This event has ignited our enthusiasm for AI and its potential to transform various domains, from education to healthcare and beyond.
We are more enthusiastic than ever to continue learning and exploring new advancements in AI technology. Our next steps involve diving deeper into the intricacies of natural language processing, machine learning, and other AI-related disciplines. We plan to leverage our experiences from this project to further our understanding and contribute meaningfully to the field.</code>

---

##  Features

<code>► The core feature is to have a context AI for helping students enhance their study. By giving to the ai school/university material it can learn from it and therefore be more precises with the answers.
The Safe mode button allows the ai to ask other LLM connected to internet to help him with the prompt since the information provided are not enough</code>



##  Getting Started


###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the HackUPC repository:
>
> ```console
> $ git clone https://github.com/giumanuz/HackUPC.git
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd HackUPC
> ```
 3. Before running docker make sure to modify the .end_sample file by adding the OPENAI-KEY and renaming the file as .env
>
> 4. Run Docker on terminal(may need to use log as superuser with sudo):
> ```console
> $ docker-compose up 
> ```
> 

###  Usage

<h4>From <code>source</code></h4>

>AConnect to the localhost port 5173 to start use the application





##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/giumanuz/HackUPC.git/issues)**: Submit bugs found or log feature requests for the `HackUPC` project.
- **[Submit Pull Requests](https://github.com/giumanuz/HackUPC.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/giumanuz/HackUPC.git/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/giumanuz/HackUPC.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/giumanuz/HackUPC.git/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=giumanuz/HackUPC.git">
   </a>
</p>
</details>

---

##  License

This project is protected under the [MIT-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-overview)

---
