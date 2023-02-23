// The Composite Pattern Concepts
interface ICompositeComponent {
  // A component interface describing the common fields and methods of leaves and composites
  name: string;
  referenceToParent?: Composite;
  method(): void; // A method each Leaf and composite container should implement
  detach(): void; // Called before a leaf is attached to a composite
}

class Leaf implements ICompositeComponent {
  // A leaf can be added to a composite, but not a leaf.
  referenceToParent?: Composite = undefined;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : 'none';
    console.log(`<Leaf>\t\tName: ${this.name}\tParent: ${parent}`);
  }

  detach(): void {
    // Detaching this leaf from its parent composite
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
    }
  }
}

class Composite implements ICompositeComponent {
  // A composite can contain leaves and composites
  referenceToParent?: Composite;
  components: ICompositeComponent[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : 'none';
    console.log(
      `<Composite>\tName: ${this.name}\tParent: ${parent}\tComponents: ${this.components.length}`
    );
    this.components.forEach((component) => {
      component.method();
    });
  }

  attach(component: ICompositeComponent): void {
    // Detach leaf / composite from any current parent reference and then set the parent reference to this composite
    component.detach();
    component.referenceToParent = this;
    this.components.push(component);
  }

  delete(component: ICompositeComponent): void {
    // Detaching this composite from its parent composite
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  detach(): void {
    // Detaching this composite from its parent composite
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
      this.referenceToParent = undefined;
    }
  }
}


// The client
const LEAF_A = new Leaf('leaf-a');
const LEAF_B = new Leaf('leaf-b');
const COMPOSITE_1 = new Composite('compo-1');
const COMPOSITE_2 = new Composite('Compo-2');

// Attach LEAF_A to Composite
COMPOSITE_1.attach(LEAF_A);

// Instead, attach LEAF_A to COMPOSITE_2
COMPOSITE_2.attach(LEAF_A);

// Attach COMPOSITE_1 to COMPOSITE_2
COMPOSITE_2.attach(COMPOSITE_1);

LEAF_B.method();
COMPOSITE_2.method();
